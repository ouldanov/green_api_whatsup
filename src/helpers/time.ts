export const nowInSeconds = () => Math.round(Date.now() / 1000);

export const getFormattedTime = (seconds: number) => {
  const date = new Date(seconds * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};
