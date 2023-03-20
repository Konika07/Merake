import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    postText: Yup.string().required(),
    username: Yup.string().min(3, "Characters allowed are 3 or more than 3").max(10, "Characters allowed are 10 or less than 10").required()
})

export default validationSchema;