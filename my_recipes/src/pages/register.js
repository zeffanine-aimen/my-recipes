import { 
    IonAlert, 
    IonAvatar, 
    IonButton, 
    IonCol, 
    IonContent, 
    IonGrid, 
    IonImg, 
    IonInput, 
    IonItem,
     IonLabel, 
    IonLoading, 
    IonPage, 
    IonRouterLink, 
    IonRow, 
    IonText 
} from "@ionic/react"
import Header from "../components/Header/Header";
import avatar from './assets/images/avatar.png';
import './styles/register.css'
import {Formik} from 'formik';
import * as yup from 'yup';
import axios from '../config/axios';
import { REGISTER_URL } from "../config/urls";
import { useState } from "react";
import { useHistory } from "react-router";

const Register = () => {

    const [showLoading, setShowLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const history = useHistory()
    
    const validationSchema = yup.object({
        name: yup
            .string()
            .nullable()
            .required("يجب عليك إدخال اسم المستخدم"),
        email: yup
            .string()
            .nullable()
            .email("يجب عليك إدخال بريد إلكتروني صحيح")
            .required("يجب عليك إدخال البريد الإلكتروني"),
        password: yup
            .string()
            .nullable()
            .min(5, 'يجب عليك إدخال 5 محارف على الأقل')
            .required("يجب عليك إدخال كلمة مرور"),
    });


    const onSubmit = async (values) => {
        setShowLoading(true)
        try {
            await axios.post(REGISTER_URL, values).then(res => {
                console.log(res);
                setShowAlert(true)
                setShowLoading(false)
            })
        } catch(e) {
            if (e.response.status === 400) {
                setShowLoading(false)
                setShowErrorAlert(true)
            } else {
                console.log(e.message);
                setShowLoading(false)
            }
        }
    }



    return (
        <IonPage>
            {showLoading 
            ? 
            <IonLoading isOpen={showLoading} /> 
            :
            <>
            <IonAlert
            isOpen={showAlert}
            header="تنبيه!"
            subHeader="لقد تم تسجيل حسابك بالفعل"
            message="يمكنك الانتقال إلى صفحة تسجيل الدخول"
            buttons={[
                {
                    text: "موافق",
                    handler: () => {
                        history.push('/account/login')
                    }
                }
            ]}
            />
            <IonAlert
            isOpen={showErrorAlert}
            header="تنبيه!"
            subHeader="هذا البريد الإلكتروني مستخدم"
            message="هذا البريد الإلكتروني مستخدم بالفعل فهل ترغب بتسجيل الدخول؟"
            buttons={[
                {
                    text: "موافق",
                    handler: () => {
                        history.push('/account/login')
                    }
                },
                {
                    text: "إلغاء",
                    role: "cancel"
                }
            ]}
            />
            <Header headerTitle="تسجيل مستخدم جديد" />
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size-md="6" size-lg="4" offset-md="3" offset-lg="4">
                            <IonAvatar className="avatar">
                                <IonImg src={avatar} />
                            </IonAvatar>
                            <Formik
                                initialValues={{
                                    name: null,
                                    email: null,
                                    password: null
                                }}
                                validationSchema={validationSchema}
                                onSubmit={(values, {resetForm}) => {
                                    onSubmit(values);
                                    resetForm({values: ""})
                                }}
                            >
                            {
                                formikProps => (
                                <form onSubmit={formikProps.handleSubmit}>
                                    <IonItem>
                                        <IonLabel color="warning" position="floating">الاسم</IonLabel>
                                        <IonInput
                                            name="name"
                                            value={formikProps.values.name}
                                            onIonChange={formikProps.handleChange}
                                        />
                                    </IonItem>
                                    <IonText className="error">{formikProps.touched.name && formikProps.errors.name}</IonText>
                                    <IonItem>
                                        <IonLabel color="warning" position="floating">البريد الإلكتروني</IonLabel>
                                        <IonInput
                                            name="email"
                                            value={formikProps.values.email}
                                            onIonChange={formikProps.handleChange}
                                        />
                                    </IonItem>
                                    <IonText className="error">{formikProps.touched.email && formikProps.errors.email}</IonText>
                                    <IonItem>
                                        <IonLabel color="warning" position="floating">كلمة المرور</IonLabel>
                                        <IonInput
                                            name="password"
                                            type="password"
                                            value={formikProps.values.password}
                                            onIonChange={formikProps.handleChange}
                                        />
                                    </IonItem>
                                    <IonText className="error">{formikProps.touched.password && formikProps.errors.password}</IonText>
                                    <div className="ion-text-center btn">
                                        <IonButton type="submit" className="button">إنشاء حساب</IonButton>
                                        <IonRouterLink routerLink="/account/login" className="router-link" color="warning">تسجيل الدخول</IonRouterLink>
                                    </div>
                                </form>
                                )
                            }
                            </Formik>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
            </>
            }

        </IonPage>
    )
}

export default Register;