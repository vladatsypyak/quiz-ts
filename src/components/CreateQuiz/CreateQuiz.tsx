import React from "react";
import s from "./createQuiz.module.scss"
import Option from "./Option/Option";
const CreateQuiz = () => {

    return (
        <form className={s.container}>
            <div className={s.title_wrap}>
                <p className={s.title}>Назва</p>
                <input placeholder={"Назва квізу"} type="text"/>
            </div>
            <div className={s.question_section}>
                <p className={s.number}>1</p>
             <div className={s.question_wrap}>
                 <input className={s.question} type="text"/>
                 <div className={s.options_wrap}>
                     <div className={s.option}>
                         <Option/>
                     </div>
                     <div className={s.option}>
                         <Option/>
                     </div>
                     <div className={s.option}>
                         <Option/>
                     </div>
                     <div className={s.option}>
                         <Option/>
                     </div>
                 </div>
             </div>
                <div className={s.question_buttons}>
                    <button>c</button>
                    <button>d</button>
                </div>
            </div>
            <button>+</button>
        </form>
    )
}
export default CreateQuiz