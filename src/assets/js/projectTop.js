const obj = (() => {
  return {
    method() {
      alert('Hello Babel!');
    }
  };
})();

obj.method();
