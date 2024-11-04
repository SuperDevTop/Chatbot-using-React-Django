const axios = {
    post: jest.fn(() => Promise.resolve({ data: { message: 'Mocked response' } })),
  };
  
  export default axios;
  