import {View, Text, Button, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBook, faCamera} from '@fortawesome/free-solid-svg-icons';

// import {launchImageLibrary} from 'react-native-image-picker';

const ScanScreen = () => {
  const [img, setImg] = useState();
  const [res, setRes] = useState();
  const handleSubmit = data => {
    // e.preventDefault();
    const getData = async () => {
      try {
        await axios
          .post('http://10.238.30.185:8081/test', {img}) //For Flask server
          // .post('http://localhost:8081/Calculus/fundamental', {data})
          .then(res => {
            setRes(res.data);
            // console.log('XXXXXXXXXXXXXXXXXXX', res.data);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  };
  const upload = () => {
    ImagePicker.openPicker({
      compressImageMaxWidth: 600,
      compressImageMaxHeight: 400,
      freeStyleCropEnabled: true,
      includeBase64: true,
      width: 600,
      height: 300,
      cropping: true,
    }).then(image => {
      // setImg(image.path);
      console.log(image);
      const uri = image.path;
      const type = 'image/png';
      const name = 'image';
      // const name = response.assets[0].fileName;
      const source = {uri, type, name};
      handleUpload(source);
      // handleUpload();
    });
  };
  const handleUpload = image => {
    // console.log(image);
    const data = new FormData();
    console.log(data);
    data.append('file', image);
    data.append('upload_preset', 'thesisapp');
    data.append('cloud_name', 'dktopqn1g');
    fetch('https://api.cloudinary.com/v1_1/dktopqn1g/image/upload', {
      method: 'post',
      body: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => res.json())
      .then(data => {
        setImg(data.url);
        console.log(data);
      })
      .catch(err => {
        console.log('Error While Uploading');
      });
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      const uri = image.path;
      const type = 'image/png';
      const name = 'image';
      const source = {uri, type, name};
      handleUpload(source);
    });
  };
  return (
    <View
      style={{flex: 1, justifyContent: 'flex-end', backgroundColor: '#e5e5e5'}}>
      <View
        style={{
          flex: 0.3,
          justifyContent: 'flex-end',
          backgroundColor: '#FFF',
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 3,
        }}>
        <TouchableOpacity
          style={{
            flex: 0.5,
            justifyContent: 'center',
            borderBottomColor: '#e5e5e5',
            borderBottomWidth: 2,
          }}
          onPress={upload}>
          <View
            style={{display: 'flex', flexDirection: 'row', marginLeft: '5%'}}>
            <FontAwesomeIcon
              icon={faBook}
              color={'#2874fc'}
              size={24}
              style={{position: 'relative', bottom: '-1.5%'}}
            />
            <Text
              style={{
                fontSize: 24,
                fontWeight: 400,
                color: '#333232',
                marginLeft: '3%',
              }}>
              Gallery
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 0.5,
            justifyContent: 'center',
          }}
          onPress={openCamera}>
          <View
            style={{display: 'flex', flexDirection: 'row', marginLeft: '5%'}}>
            <FontAwesomeIcon
              icon={faCamera}
              color={'#2874fc'}
              size={24}
              style={{position: 'relative', bottom: '-1.5%'}}
            />
            <Text
              style={{
                fontSize: 24,
                fontWeight: 400,
                color: '#333232',
                marginLeft: '3%',
              }}>
              Camera
            </Text>
          </View>
        </TouchableOpacity>
        {/* <Button title="Gallery" onPress={upload} />
        <Button title="Camera" onPress={openCamera} /> */}
        {/* <Button title="Submit" onPress={handleSubmit} /> */}
      </View>
      {/* <Text>{img && img}</Text>
      {res && <MathView style={{margin: '5%'}} resizeMode="cover" math={res} />} */}
    </View>
  );
};

export default ScanScreen;
