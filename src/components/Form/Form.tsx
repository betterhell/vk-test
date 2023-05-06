import React, { useState } from "react";
import styles from "./styles.module.scss";

import Select from "react-select";
import Button from "../../UI-kit/Button/Button";
import { ReactComponent as VKlogo } from "../../assets/VK_Compact_Logo_(2021-present).svg";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
registerLocale("ru", ru);

import { buildOptions } from "../../data/buildOptions";
import { roomOptions } from "../../data/roomOptions";
import { levelOptions } from "../../data/levelOptions";

const Form = () => {
  const [startDate, setStartDate] = useState<any>(null);

  const [textarea, setTextarea] = useState("");

  const [building, setBuilding] = useState<any>(null);
  const [level, setLevel] = useState<any>(null);
  const [room, setRoom] = useState<any>(null);

  const handleChangeDate = (date: Date) => {
    setStartDate(date);
  };

  const handleInputChange = (event: React.ChangeEvent<any>) => {
    setTextarea(event.target.value);
  };

  const handleBuildingChange = (value: string) => {
    setBuilding(value);
  };

  const handleLevelChange = (value: string) => {
    setLevel(value);
  };

  const handleRoomChange = (value: string) => {
    setRoom(value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    console.log(
      JSON.stringify({
        Building: building.value,
        Level: level.value,
        Room: room.value,
        Date: startDate.toLocaleString("ru-RU"),
        Commentary: textarea,
      })
    );
  };

  const handleReset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    setStartDate(null);
    setBuilding(null);
    setLevel(null);
    setRoom(null);
    setTextarea("");
  };

  return (
    <div className={styles.form_wrapper}>
      <div className={styles.form_logo}>
        <VKlogo />
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.form_building}>
          <h3>Выберите здание</h3>
          <Select
            value={building}
            required={true}
            placeholder="Выбрать здание"
            onChange={handleBuildingChange}
            options={buildOptions}
          />
        </div>

        <div className={styles.form_level}>
          <h3>Выберите этаж</h3>
          <Select
            value={level}
            required={true}
            placeholder="Выбрать этаж"
            onChange={handleLevelChange}
            options={levelOptions}
          />
        </div>

        <div className={styles.form_room}>
          <h3>Выберите переговорку</h3>
          <Select
            value={room}
            required={true}
            placeholder="Выбрать переговорку"
            onChange={handleRoomChange}
            options={roomOptions}
          />
        </div>

        <div className={styles.form_datepick}>
          <h3>Выберите дату и время</h3>
          <DatePicker
            required={true}
            placeholderText={"Дата и время"}
            selected={startDate}
            onChange={handleChangeDate}
            showTimeSelect
            dateFormat="P , p"
            locale="ru"
          />
        </div>

        <div className={styles.form_textarea}>
          <h3>Комментарий</h3>
          <textarea
            onChange={handleInputChange}
            value={textarea}
            maxLength={120}
            className={styles.textarea}
            placeholder="Ваш комментарий"
          ></textarea>
        </div>

        <div className={styles.form_control}>
          <Button>Отправить</Button>
        </div>
      </form>

      <Button onClick={handleReset}>Очистить</Button>
    </div>
  );
};

export default Form;
