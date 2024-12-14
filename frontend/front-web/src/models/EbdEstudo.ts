export type EbdEstudo = {
  id: number;
  nome: string;
  pdfDeEstudo: Uint8Array;
  EBDCurso: EBDCurso[];
};
export type EBDCurso = {
  id: number;
  nome: string;
};
