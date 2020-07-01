function checkInput(leavingFromText) {
    let urlRGEX = /^[a-zA-Z\s]{0,255}$/;
    if (urlRGEX.test(leavingFromText)) {
      return
    } else {
      alert("please enter a valid name");
    }
  }
  
  export { checkInput }