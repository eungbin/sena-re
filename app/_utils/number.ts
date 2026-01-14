/**
 * 숫자를 천단위 콤마 추가된 문자열로 변환
 * @param number - 숫자
 * @returns - 천단위 콤마 추가된 문자열
 */
function convertFormatNumberWithComma(number: number): string {
  return Math.floor(number).toLocaleString("ko-KR");
}

/**
 * 빈 문자열일 경우 0으로 반환
 * @param number | '' - 숫자 또는 빈 문자열
 * @returns - 숫자
 */
function toNumberOrZero(number: number | ''): number {
  if(number === '' ) return 0;
  return number;
}

export { convertFormatNumberWithComma, toNumberOrZero };