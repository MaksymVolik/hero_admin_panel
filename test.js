const heroUpd = async () => {
  await new Promise((resolve, reject) => setTimeout(resolve, 3000)).then(
    console.log("2")
  );
};

heroUpd();
