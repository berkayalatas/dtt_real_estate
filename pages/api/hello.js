// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}

var myHeaders = new Headers();
myHeaders.append("X-Api-Key", "wrGyPvn6VagYhAqEeFOpuZ1cKdtWUm24");
myHeaders.append("Content-Type", "application/json");

var formdata = new FormData();
formdata.append("price", "20");
formdata.append("bedrooms", "1");
formdata.append("bathrooms", "1");
formdata.append("size", "1");
formdata.append("streetName", "Overtoom");
formdata.append("houseNumber", "21");
formdata.append("numberAddition", "1");
formdata.append("zip", "1181TY");
formdata.append("city", "Amsterdam");
formdata.append("constructionYear", "1960");
formdata.append("hasGarage", "false");
formdata.append("description", "Nice house!");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch("https://api.intern.d-tt.nl/api/houses", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));