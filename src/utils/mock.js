
import MockAdapter from  "axios-mock-adapter"

const OKCommonResponse = (data,headers)=>{
    headers = headers || {};
    return Promise.resolve([200,data,headers])
}

const loginPost = config=>{
    return OKCommonResponse({config})
}


const MockFake = (axios) =>{
    const mock = new MockAdapter(axios);
    mock.onPost("/login").reply(loginPost);
}

export default MockFake