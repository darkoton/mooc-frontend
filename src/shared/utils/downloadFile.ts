export const downloadFile = async (fileUrl: string) => {
  try {
    const res = await fetch(fileUrl);
    const blob = await res.blob();

    const fileName = (() => {
      const splittedFileUrl = fileUrl.split("/");
      return splittedFileUrl[splittedFileUrl.length - 1];
    })();

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error(err);
  }
};
