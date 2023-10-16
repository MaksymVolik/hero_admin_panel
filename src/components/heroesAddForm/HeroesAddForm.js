import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"

import { useHttp } from '../../hooks/http.hook';
import { heroesAdd } from '../heroesList/heroesSlice';
import { selectAll } from '../heroesFilters/fitersSlice';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const filters = useSelector(selectAll);
    const filtersLoadingStatus = useSelector(state => state.filters.filtersLoadingStatus);
    const dispatch = useDispatch();
    const { request } = useHttp();

    const heroAdd = (values) => {
        const hero = {
            id: uuidv4(),
            ...values
        };
        request("http://localhost:3001/heroes", 'POST', JSON.stringify(hero, null, 2))
            .then(() => dispatch(heroesAdd(hero)))
            .catch(err => console.log(err))
            ;
    }

    const renderFilters = (process, elements) => {
        if (process === 'loading') {
            return <option>Loading...</option>;
        } else if (process === 'error') {
            return <option>Ошибка загрузки</option>;
        }

        if (elements.length === 0) {
            return <option>Список элементов пуст</option>
        }

        const items = elements.filter(item => item.name !== 'all').map(({ name, title }) => {
            return (
                <option key={name} value={name}>{title}</option>
            )
        })
        return (
            <>
                <option >Я владею элементом...</option>
                {items}
            </>
        )
    }

    return (
        <Formik initialValues={{
            name: '',
            description: '',
            element: '',
        }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .min(2, 'Мінімальна довжина 2 символа!')
                    .required("Обв'язкове поле!"),
                description: Yup.string()
                    .min(5, "Кількість повина бути на менше 5")
                    .required("Обв'язкове поле!"),
                element: Yup.string()
                    .required("Треба обрати елемент!"),
            })}
            // onSubmit={values => console.log(JSON.stringify(values, null, 2))}
            onSubmit={(values, { resetForm }) => {
                heroAdd(values)
                resetForm()
            }}>
            <Form className="border p-4 shadow-lg rounded">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                    <Field
                        id="name"
                        name="name"
                        type="text"
                        className="form-control"
                        placeholder="Как меня зовут?"
                        autoComplete="on" />
                    <ErrorMessage className="error" name="name" component="div" />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label fs-4">Описание</label>
                    <Field
                        id="description"
                        name="description"
                        as="textarea"
                        className="form-control"
                        placeholder="Что я умею?"
                        style={{ "height": '130px' }} />
                    <ErrorMessage className="error" name="description" component="div" />
                </div>

                <div className="mb-3">
                    <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                    <Field
                        as="select"
                        className="form-select"
                        id="element"
                        name="element">
                        {renderFilters(filtersLoadingStatus, filters)}
                    </Field>
                    <ErrorMessage className="error" name="element" component="div" />
                </div>

                <button type="submit" className="btn btn-primary">Создать</button>
            </Form>
        </Formik>


    )
}

export default HeroesAddForm;

