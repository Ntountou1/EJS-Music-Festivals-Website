

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (365*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = "username" + "=" + cname + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    let name = cname + "=";
 
    let ca = document.cookie.split(';');

    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }


  
  function checkCookie() {
    let user = getCookie("username");
    let admin = getCookie("admin");

    
    
    if (user != "") {

  
    } else if (admin != ""){
  
    }else {
      
      window.location.href = "/login";
    }
}



function adminCookie() {
  let user = getCookie("username");
  let admin = getCookie("admin");

  
  
  if (user != "") {
    window.location.href = "/";

  } else if (admin != ""){

  }else {
    
    window.location.href = "/login";
  }
}
  

function checkingCookie(y) {
  let user = getCookie("username");
  let admin = getCookie("admin");
  if (user != "") {
    var y = 1;

  } else if (admin != ""){
    var y = 2;
  }else {
    var y = 3;
  }
return y;
}
