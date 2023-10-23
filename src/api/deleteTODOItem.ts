const deleteTODOItem = (param: string | number) => ({
  method: "DELETE",
  endpoint: `items/${param}`,
});
export default deleteTODOItem;
