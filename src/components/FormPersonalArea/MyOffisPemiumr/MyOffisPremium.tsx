import React, { FC } from "react";
import classes from "./MyOffisPemiumr.module.scss";

const MyOffisPremium: FC = () => {
  return (
    <div className={classes.myOffisPremium}>
      <div className={classes.myOffisPremiumTextinfo}>
        <div className={classes.inf}>
          <div className={classes.text}>
            <h3>
              Тариф <span>|</span>
            </h3>
            <p>"Premium Plus"</p>
          </div>
          <div className={classes.text}>
            <h3>
              Дата завершения<span>|</span>
            </h3>
            <p>23.05.2024</p>
          </div>
          <span>Условия тарифа</span>
          <p>
            Тариф "Premium Plus" предоставляет полный спектр услуг для вашего
            личного аккаунта, чтобы удовлетворить все ваши потребности в
            онлайн-активностях.
            <button>Подробнее...</button>
          </p>
        </div>
      </div>
      <div className={classes.button}>
        <button>Другой тариф</button>
        <button>Продлить</button>
      </div>
    </div>
  );
};

export default MyOffisPremium;
