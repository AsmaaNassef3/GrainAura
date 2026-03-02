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

export async function changePassword(passwordData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate validation
      if (passwordData.currentPassword !== "dummy123") {
        reject({
          response: {
            data: {
              message: "Current password is incorrect",
            },
          },
        });
        return;
      }

      if (passwordData.newPassword !== passwordData.confirmPassword) {
        reject({
          response: {
            data: {
              message: "New passwords do not match",
            },
          },
        });
        return;
      }

      resolve({
        data: {
          message: "success",
        },
      });
    }, 600);
  });
}
