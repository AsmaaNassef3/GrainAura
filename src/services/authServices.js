// Dummy auth service - no real backend
export async function registerUser(formData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          message: "success",
          user: {
            id: Math.random().toString(36),
            name: formData.name,
            email: formData.email,
          },
        },
      });
    }, 500);
  });
}

export async function loginUser(formData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          message: "success",
          token: "dummy-token-" + Math.random().toString(36),
          user: {
            email: formData.email,
          },
        },
      });
    }, 500);
  });
}
