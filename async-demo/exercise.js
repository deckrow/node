
// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });

async function sendMail() {
  try {
    const customer = await getCustomer(1);
    console.log('Customer: ', customer);
    if (customer.isGold) {
      const movies = await getTopMovies(customer.movies);
      console.log('Top movies: ', movies);
      await sendEmail(customer.email, customer.movies);
      console.log('Email sent...');
    } else {
      Promise.reject(new Error('Customer not gold...'));
    }
  } catch(err) {
    console.log(err.message);
  }
}

sendMail();

function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id !== 1) reject(new Error('Wrong customer!'));
      resolve({ 
        id: 1, 
        name: 'Mosh Hamedani', 
        isGold: false, 
        email: 'email' 
      });
    }, 4000);
  });
}

function getTopMovies(movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
    }, 4000);
  });
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 4000);
  });
}