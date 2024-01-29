import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Header } from './Header';
import { Load } from './Load';
import { change_updateItem } from './Change_UpdateItem';
import { FormDate } from './FormDate';
import { FormButton } from './FormButton';
import '../stylesheets/style.css';

export const CompleteChange = () => {
  const { handleSubmit, setValue, ...formMethods } = useForm({
    defaultValues: {
      name: '',
      date: '',
    },
  });

  useEffect(() => {
    Load((httpData) => {
      const date = new Date(httpData.date);
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      // 元の日付をフォームに表示
      setValue('date', formattedDate);
    });
  }, [setValue]);
  
  const handleOnSubmit = () => {
    change_updateItem(true);
  }

  return (
    <>
    <Header />
    <main>
      <div className="container">
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <div className="area">
            <FormDate title="完了予定日" formMethods={formMethods}/>
            <FormButton/>
          </div>
        </form>
      </div>
    </main>
    </>
  );
};