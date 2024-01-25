import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import * as keyStore from './secure-key-store';

const rnBiometrics = new ReactNativeBiometrics();

//생체 인식 가능 여부
export const booleanBiometricsCheck = () => {
    return rnBiometrics
        .isSensorAvailable()
        .then(resultObject => {
            const {available, biometryType, error} = resultObject;

            if(!available){ // 인식실패(lock)
                console.log('isSensorAvailable error', error);
            }else if(available && biometryType === BiometryTypes.TouchID){
                return {result: true, type: biometryType};
            }else if(available && biometryType === BiometryTypes.FaceID){
                return {result: true, type: biometryType};
            }else if(available && biometryType === BiometryTypes.Biometrics){
                return {result: true, type: biometryType};
            }else{
                
                return {result: false, type: null};
            }
        })
        .catch(error => {
            console.log('booleanBiometricsCheck error ', error);
            return {result: false, type: null};
        });
};

//키생성
export const createKey = () => {
    return rnBiometrics
        .createKeys()
        .then(resultObject => {
            const {publicKey} = resultObject;
            return {result: true, key: publicKey};
        })
        .catch(error => {
            console.log('createKey error ', error);
            return {result: false, key: null};    
        });
};

//키존재여부
export const checkKey = () => {
    return rnBiometrics
        .biometricKeysExist()
        .then(resultObject => {
            const {keysExist} = resultObject;
            if(keysExist){
                return true;
            }else{
                return false;
            }
        })
        .catch(error => {
            console.log('checkKey error ', error);
            return false;
        });
}

export const deleteKey = () => {
    return rnBiometrics
        .deleteKeys()
        .then(resultObject => {
            const {keysDeleted} = resultObject;

            if(keysDeleted){
                return true;
            }else{
                return false;
            }
        })
        .catch(error => {
            console.log('deleteKey error ', error);
            return false;
        });
};

//값 확인
export const biometricsLogin = (
    userID = '',
    msg = '로그인',
) => {
    return rnBiometrics
        .createSignature({
            promptMessage: msg,
            payload: userID,
        })
        .then(resultObject => {
            const { success, signature} = resultObject;
            if(success){
                keyStore.setItem('biometricsKey', signature);
                return {result: true, key: signature};
            }else{
                return {result: false, key: null};
            }
        })
        .catch(error => {
            console.log('biometricsLogin error ', error);
            return {result: false, key: null, msg: error};
        });
};