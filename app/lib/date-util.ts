function formatTime(seconds: number): string {
  if (isNaN(seconds)) return "0:00"; // NaN 방지

  const minutes = Math.floor(seconds / 60); // 분 계산
  const remainingSeconds = Math.floor(seconds % 60); // 남은 초 계산

  // 초가 한 자리일 경우 앞에 0 추가
  const paddedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

  return `${minutes}:${paddedSeconds}`;
}

export { formatTime };
