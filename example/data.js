export default async () => {
  const nums = ['161', '239', '392', '556', '715', '728', '781', '832', '866', '919'];

  return nums.map((num) => {
    return {
      dist: `./dist/image-${num}.png`,
      title: `Number: ${num}`,
    };
  });
};
