import * as Yup from 'yup';

export const newGymSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(30, 'Too Long!')
        .required('Required'),
    description: Yup.string().min(4, 'Too Short!').max(200, "Too Long!").required('Required'),
});

export const newWallSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(30, 'Too Long!')
        .required('Required'),
    description: Yup.string().min(4, 'Too Short!').max(200, "Too Long!").required('Required'),
    angle: Yup.number().min(-60, "Thats not right..").max(90, "Um.. I dont think so..").required("Required!")
});