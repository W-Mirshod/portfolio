export const initializeAudio = (audioFilePath, volume = 0.4) => {
  const audio = new Audio(audioFilePath);
  audio.volume = volume;

  const playAudio = () => {
    audio.play();
    document.removeEventListener('click', playAudio);
  };

  document.addEventListener('click', playAudio);

  return () => {
    document.removeEventListener('click', playAudio);
  };
};
