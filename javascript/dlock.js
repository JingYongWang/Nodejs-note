var people = {
  name: "陳鍾誠",
  age: 46,
  phone: 082313534,
  email: "ccckmit@gmail.com"
}


if ( process.argv[2] != "陳鍾誠")
{
  console.log("找不到" + process.argv[2] + "這個人");
}
else {
  console.log(people.name);
  console.log(people.age);
  console.log(people.phone);
  console.log(people.email);
}
