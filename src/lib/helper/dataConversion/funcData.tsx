export function formatarData(dataString: string) {
  const partes = dataString.split("T");

  const data = new Date(partes[0]);

  const mesesAbreviados = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const nomeMesAbreviado = mesesAbreviados[data.getMonth()];

  const nomeDiaSemanaAbreviado = data.toLocaleDateString("en-US", {
    weekday: "short",
  });

  const dia = data.getDate();

  const ano = data.getFullYear();

  const dataFormatada =
    nomeDiaSemanaAbreviado + " " + nomeMesAbreviado + " " + dia + " " + ano;

  return dataFormatada;
}
