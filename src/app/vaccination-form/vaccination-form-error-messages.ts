export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) {}
}

export const VaccinationFormErrorMessages = [
  new ErrorMessage("from", "required", "Ein Stardatum muss angegeben werden"),
  //new ErrorMessage("from", "datePast", "Das Stardatum kann nicht in der Vergangenheit liegen"),
  new ErrorMessage("to", "required", "Ein Enddatum muss angegeben werden"),
  //new ErrorMessage("to", "datePast", "Das Enddatum kann nicht in der Vergangenheit liegen"),
  new ErrorMessage("location", "required", "Ein Ort muss angegeben werden"),
  new ErrorMessage("maxPatients", "required", "Eine Anzahl an freien Impfplätzen muss angegeben werden")
]