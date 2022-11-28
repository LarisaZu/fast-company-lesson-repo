const displayDate = data => {
  const date = new Date(parseInt(data));
  const dateNow = new Date();
  const yearDif = dateNow.getFullYear() - date.getFullYear();

  if (yearDif === 0) {
    const dayDif = dateNow.getDay() - date.getDay();
    if (dayDif === 0) {
      const hourDif = dateNow.getHours() - date.getHours();
      if (hourDif === 0) {
        const minDif = dateNow.getMinutes() - date.getMinutes();

        if (minDif >= 0 && minDif < 5) return '1 минуту назад';
        if (minDif >= 5 && minDif < 10) return '5 минут назад';
        if (minDif >= 10 && minDif < 30) return '10 минут назад';
        return '30 минут назад';
      } else {
        return `${date.getHours()}:${date.getMinutes}`;
      }
    } else {
      return `${date.getDate()} ${date.toLocaleString('default', {
        month: 'long',
      })}`;
    }
  } else {
    return (
      date.getDate().toString().padStart(2, '0') +
      '.' +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      '.' +
      date.getFullYear()
    );
  }
};

export default displayDate;
