export const logSetupComplete = (component: string): void => {
  console.log(
    `%c${component} %csetup complete.`,
    'color: yellow; background: black',
    'color: white; background: black'
  );
};

export const downloadFile = (
  contents: string,
  fileName: string,
  __document: Document
): void => {
  const element = __document.createElement('a');
  const file = new Blob([contents], {
    type: 'text/plain'
  });
  element.href = URL.createObjectURL(file);
  element.download = fileName;
  __document.body.appendChild(element);
  element.click();
  __document.body.removeChild(element);
};