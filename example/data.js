export default async () => {
  return new Array(10).fill(0).map(() => {
    const num = Math.floor(Math.random() * 1000);

    return {
      dist: `./dist/image-${num}.jpg`,
      title: `Number: ${num}`,
    };
  });
};
