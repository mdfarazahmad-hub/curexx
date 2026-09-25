import { useState, useEffect, useCallback, useRef } from 'react';
import { QueueUrgencyStatus, VirtualQueueToken } from '../types';

export function useVirtualQueue() {
  const [currentServingToken, setCurrentServingToken] = useState<number>(14);
  const [myTokenNumber, setMyTokenNumber] = useState<number>(18);
  const [avgMinutesPerPatient] = useState<number>(5);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isAutoAdvancing, setIsAutoAdvancing] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [notificationBanner, setNotificationBanner] = useState<string | null>(null);

  const prevTokenRef = useRef(currentServingToken);

  // Play browser chime via Web Audio API
  const playChime = useCallback((isYourTurn = false) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (isYourTurn) {
        // High priority fanfare for your turn: 3 melodic ascending tones
        const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.15);
          gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.15);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.15 + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.15);
          osc.stop(ctx.currentTime + idx * 0.15 + 0.35);
        });
      } else {
        // Standard queue step chime (D5 -> A5)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.14);
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.38);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.38);
      }
    } catch {
      // AudioContext blocked by browser autoplay policy until user gesture
    }
  }, [soundEnabled]);

  // Derived calculations
  const tokensAhead = Math.max(0, myTokenNumber - currentServingToken);
  const estimatedMinutesLeft = tokensAhead * avgMinutesPerPatient;

  // Determine Urgency Status & Guidance
  let urgencyStatus: QueueUrgencyStatus = 'safe_distance';
  let guidanceHeadline = '';
  let guidanceSubtext = '';

  if (tokensAhead > 2) {
    urgencyStatus = 'safe_distance';
    guidanceHeadline = `The doctor is on Token #${currentServingToken} right now.`;
    guidanceSubtext = `You have ${estimatedMinutesLeft} minutes left — no need to sit in the waiting room yet.`;
  } else if (tokensAhead === 2) {
    urgencyStatus = 'moving_closer';
    guidanceHeadline = `Doctor called Token #${currentServingToken} • 2 patients ahead.`;
    guidanceSubtext = `Approx. ${estimatedMinutesLeft} minutes remaining. Please start walking towards OPD Wing B (Floor 2).`;
  } else if (tokensAhead === 1) {
    urgencyStatus = 'seat_now';
    guidanceHeadline = `Token #${currentServingToken} in session • You are next!`;
    guidanceSubtext = `Approx. ${estimatedMinutesLeft} minutes left. Please take a seat directly outside Consultation Room 204.`;
  } else if (tokensAhead === 0 && currentServingToken === myTokenNumber) {
    urgencyStatus = 'enter_room';
    guidanceHeadline = `Token #${myTokenNumber} CALLED — It's your turn!`;
    guidanceSubtext = `Dr. Ananya Sharma is ready for you. Please proceed into Consultation Room 204 now.`;
  } else {
    urgencyStatus = 'consultation_active';
    guidanceHeadline = `Consultation in progress (Token #${myTokenNumber})`;
    guidanceSubtext = `Doctor session is currently recorded in EHR.`;
  }

  // Generate tokens list around current serving token
  const tokensList: VirtualQueueToken[] = [];
  const startToken = Math.max(1, currentServingToken - 2);
  const endToken = Math.max(myTokenNumber + 2, currentServingToken + 5);

  const sampleInitials = ['M.K.', 'S.R.', 'A.J.', 'D.P.', 'R.S.', 'T.N.', 'P.L.', 'K.B.', 'V.M.'];

  for (let t = startToken; t <= endToken; t++) {
    const isMe = t === myTokenNumber;
    let status: VirtualQueueToken['status'] = 'waiting';

    if (t < currentServingToken) {
      status = 'completed';
    } else if (t === currentServingToken) {
      status = 'in_consultation';
    } else if (t === currentServingToken + 1) {
      status = 'up_next';
    } else if (isMe) {
      status = 'you';
    }

    const diff = Math.max(0, t - currentServingToken);
    tokensList.push({
      tokenNumber: t,
      patientInitials: isMe ? 'YOU' : sampleInitials[t % sampleInitials.length],
      status,
      approxWaitMins: diff * avgMinutesPerPatient,
      calledAt: t <= currentServingToken ? `${10 + Math.floor((t * 5) / 60)}:${String((t * 5) % 60).padStart(2, '0')} AM` : undefined,
    });
  }

  // Trigger sound and notifications when token advances
  useEffect(() => {
    if (currentServingToken !== prevTokenRef.current) {
      const isYourTurn = currentServingToken === myTokenNumber;
      playChime(isYourTurn);
      setLastUpdated(new Date());

      if (isYourTurn) {
        setNotificationBanner(`🔔 TOKEN #${myTokenNumber} CALLED: Please proceed to Room 204!`);
      } else if (myTokenNumber - currentServingToken === 1) {
        setNotificationBanner(`⚡ Doctor is on Token #${currentServingToken}. You are next in line!`);
      } else {
        setNotificationBanner(`Token updated: Doctor is now seeing Token #${currentServingToken}`);
      }

      const timer = setTimeout(() => setNotificationBanner(null), 5000);
      prevTokenRef.current = currentServingToken;
      return () => clearTimeout(timer);
    }
  }, [currentServingToken, myTokenNumber, playChime]);

  // Auto advance loop if enabled
  useEffect(() => {
    if (!isAutoAdvancing) return;
    const interval = setInterval(() => {
      setCurrentServingToken((prev) => {
        if (prev >= myTokenNumber + 1) {
          setIsAutoAdvancing(false);
          return prev;
        }
        return prev + 1;
      });
    }, 12000); // 12 seconds per token during live auto-simulation
    return () => clearInterval(interval);
  }, [isAutoAdvancing, myTokenNumber]);

  // Actions
  const advanceToken = () => {
    setCurrentServingToken((prev) => prev + 1);
  };

  const rewindToken = () => {
    setCurrentServingToken((prev) => Math.max(1, prev - 1));
  };

  const resetToPromptState = () => {
    setCurrentServingToken(14);
    setMyTokenNumber(18);
    setNotificationBanner('Queue reset to Token #14 (You: Token #18, 20m wait)');
    setTimeout(() => setNotificationBanner(null), 3000);
  };

  const deferToken = () => {
    setMyTokenNumber((prev) => prev + 2);
    setNotificationBanner('Your token has been deferred by +2 positions (+10 minutes buffer added).');
    setTimeout(() => setNotificationBanner(null), 4000);
  };

  return {
    currentServingToken,
    myTokenNumber,
    avgMinutesPerPatient,
    tokensAhead,
    estimatedMinutesLeft,
    urgencyStatus,
    guidanceHeadline,
    guidanceSubtext,
    tokensList,
    soundEnabled,
    isAutoAdvancing,
    lastUpdated,
    notificationBanner,
    setSoundEnabled,
    setIsAutoAdvancing,
    advanceToken,
    rewindToken,
    resetToPromptState,
    deferToken,
    playChime,
  };
}
