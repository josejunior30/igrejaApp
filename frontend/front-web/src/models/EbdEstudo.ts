export type EbdEstudo = {
  id: number;
  nome: string;
  pdfDeEstudo: Uint8Array;
  ebdCurso: EBDCurso;
};
export type EBDCurso = {
  id: number;
  nome: string;
};
