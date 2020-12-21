const routes = {
  HOME: "/",
  LOGIN: "/login",

  NEW_CONSTRUCTION: "/new",
  EDIT_CONSTRUCTION: "/:id/edit",
  DETAIL_CONSTRUCTION: "/:id",

  NEW_SYSTEM: "/:id/new",
  EDIT_SYSTEM: "/:id/:nickname/edit",
  DETAIL_SYSTEM: "/:id/:nickname",
  UPLOAD_SYSTEM: "/:id/:nickname/upload",
  FILES_SYSTEM: "/:id/:nickname/files",

  DETAIL_FILE: "/:id/:nickname/files/:file_id",
  EDIT_FILE: "/:id/:nickname/files/:file_id/edit",
};

export default routes;
