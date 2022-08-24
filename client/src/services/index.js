const baseUrl = "https://sih-2022-server.azurewebsites.net/api";
const baseUrlChat = "https://sih-email.herokuapp.com/api/chat";

const apiEndPoints = {
  // GET REQUESTS
  getEmployee: `/getEmployee`,
  getAdmin: `/getAdmin`,
  trackStatus: `/trackStatus`,
  listDocument: `/listDocument`,
  rooms: `/rooms`,
  messages: `/messages`,
  conversation: `/conversation`,
  loadMessages: `/loadMessages`,
  getYourApprovedDocuments: `/getYourApprovedDocuments`,
  getYourRejectedDocuments: `/getYourRejectedDocuments`,
  getDocument: `/getDocument`,

  // POST REQUESTS
  login: `/login`,
  createEmployee: `/createEmployee`,
  createDocument: `/createDocument`,
  uploadFile: `/uploadFile`,
  assignDocument: `/assignDocument`,
  forwardToAdmin: `/forwardToAdmin`,
  rejectDocument: `/rejectDocument`,
};

// GET REQUESTS
export async function getEmployee(params) {
  try {
    const res = (
      await fetch(
        baseUrl + apiEndPoints.getEmployee + `?employeeId=${params.employeeId}` + `&departmentId=${params.departmentId}` ,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            "Content-type": "application/json",
          },
        }
      ).then((res) => res.json())
    );
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function getAdmin(params) {
  try {
    const res = (
      await fetch(
        baseUrl + apiEndPoints.getAdmin + `?employeeId=${params.employeeId}` + `&departmentId=${params.departmentId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            "Content-type": "application/json",
          },
        }
      ).then((res) => res.json())
    );
    return res;
  }
  catch (error) {
    console.log(error);
  }
}

export async function trackStatus(params) {
  try {
    const res = (
      await fetch(
        baseUrl + apiEndPoints.trackStatus + `?documentId=${params.documentId} ` + `&employeeId=${params.employeeId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            "Content-type": "application/json",
          },
        }
      ).then((res) => res.json())
    );
    return res;
  }
  catch (error) {
    console.log(error);
  }
}

export async function listDocument(params) {
  try {
    const res = (
      await fetch(
        baseUrl + apiEndPoints.listDocument + `?employeeId=${params.employeeId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            "Content-type": "application/json",
          },
        }
      ).then((res) => res.json())
    );
    return res;
  }
  catch (error) {
    console.log(error);
  }
}

export async function getRooms(params) {
  try {
    const res = (
      await fetch(
        baseUrlChat + apiEndPoints.rooms + `?employeeId=${params.employeeId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            "Content-type": "application/json",
          },
        }
      ).then((res) => res.json())
    );
    return res;
  }
  catch (error) {
    console.log(error);
  }
}

export async function loadMessages(params) {
  try {
    const res = (
      await fetch(
        baseUrlChat + apiEndPoints.loadMessages + `?employeeId=${params.employeeId}` + `&pageNo=${params.pageNo}` + `&filter=${params.filter}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            "Content-type": "application/json",
          },
        }
      ).then((res) => res.json())
    );
    return res;
  }
  catch (error) {
    console.log(error);
  }
}

export async function getYourApprovedDocuments(params) {
  try {
    const res = (
      await fetch(
        baseUrl + apiEndPoints.getYourApprovedDocuments + `?employeeId=${params.employeeId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            "Content-type": "application/json",
          },
        }
      ).then((res) => res.json())
    );
    return res;
  }
  catch (error) {
    console.log(error);
  }
}

export async function getYourRejectedDocuments(params) {
  try {
    const res = (
      await fetch(
        baseUrl + apiEndPoints.getYourRejectedDocuments + `?employeeId=${params.employeeId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            "Content-type": "application/json",
          },
        }
      ).then((res) => res.json())
    );
    return res;
  }
  catch (error) {
    console.log(error);
  }
}

export async function getDocument(params) {
  try {
    const res = (
      await fetch(
        baseUrl + apiEndPoints.getDocument + `?documentId=${params.documentId}` + `&employeeId=${params.employeeId}` + `&role=${params.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            "Content-type": "application/json",
          },
        }
      ).then((res) => res.json())
    );
    return res;
  }
  catch (error) {
    console.log(error);
  }
}

// POST REQUESTS
export async function login(data) {
  try {
    const res = (
      await fetch(baseUrl + apiEndPoints.login, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json())
    );
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function createEmployee(data) {
  try {
    const res = (
      await fetch(baseUrl + apiEndPoints.createEmployee, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json())
    );
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function uploadFile(data) {
  try {
    const res = (
      await fetch(baseUrl + apiEndPoints.uploadFile, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          "Content-type": "multipart/form-data",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json())
    );
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function createDocument(data) {
  try {
    const res = (
      await fetch(baseUrl + apiEndPoints.createDocument, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json())
    );
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function assignDocument(data) {
  try {
    const res = (
      await fetch(baseUrl + apiEndPoints.assignDocument, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json())
    );
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function forwardToAdmin(data) {
  try {
    const res = (
      await fetch(baseUrl + apiEndPoints.forwardToAdmin, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json())
    );
    return res;
  } catch (error) {
    console.log(error);
  }
}


export async function rejectDocument(data) {
  try {
    const res = (
      await fetch(baseUrl + apiEndPoints.rejectDocument, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json())
    );
    return res;
  } catch (error) {
    console.log(error);
  }
}