export function formatDiaMes(data: Date) {
  const dia = data.getDate();
  const mes = data.getMonth() + 1;
  return `${dia < 10 ? `0${dia}` : dia}/${mes < 10 ? `0${mes}` : mes}`;
}
