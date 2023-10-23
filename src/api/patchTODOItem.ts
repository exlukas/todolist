const patchTODOItem = (param: string | number) => ({
  method: "PUT", //PATCH not supported on mockAPI---- Access-Control-Allow-Methods GET,PUT,POST,DELETE,OPTIONS
  endpoint: `items/${param}`,
});
export default patchTODOItem;
