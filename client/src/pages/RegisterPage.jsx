import { Button, Text, Input, Select, Flex, Spacer} from '@chakra-ui/react'
import { useFormik } from "formik";
import OptionCountry from "../Components/SelectCountry.jsx"
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";


function RegisterPage () {
 
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
          fullname: "",
          username: "",
          email: "",
          password: "",
          id_number: "",
          birth_date: "",
          country: "",
          card_number: "",
          card_owner: "",
          expire_date: "",
          cvc_cvv: "",
        //   image: null,
        },
        onSubmit: async (values) => {
        //   const { fullname, username, email, password, id_number, birth_date, country, card_number, card_owner, expire_date, cvc_cvv } = values;
        //   const formData = new FormData();
        //   formData.append("fullname", fullname);
        //   formData.append("username", username);
        //   formData.append("email", email);
        //   formData.append("password", password);
        //   formData.append("id_number", id_number);
        //   formData.append("birth_date", birth_date);
        //   formData.append("country", country);
        //   formData.append("card_number", card_number);
        //   formData.append("card_owner", card_owner);
        //   formData.append("expire_date", expire_date);
        //   formData.append("cvc_cvv", cvc_cvv);
        //   formData.append("image", values.image);
      
        //   try {
        //     const response = await axios.post(
        //       "http://localhost:4000/auth/register",
        //       formData,
        //       {
        //         headers: {
        //           "Content-Type": "multipart/form-data",
        //         },
        //       }
        //     );
        //     console.log(response.data);
        //     navigate("/login");
            
        //   } catch (error) {
        //     console.error(error);
        //   }

        alert(JSON.stringify(values, null, 11))
        navigate("/login")
        },
      });

    
    return (

        <form onSubmit={formik.handleSubmit}>
        
        <Flex height={1800} bg="url('/RegisterPage/background.svg')" bgSize="cover" flexDirection="row" justifyContent="center"> 
            <Flex margin={20} bg="#F7F7FB" width={850} height={1626} borderRadius={4} flexDirection="column" >
                <Flex paddingLeft={20} paddingTop={20}>
                    <Text textStyle="h2">Register</Text>
                </Flex>

                <Flex marginTop={20} marginLeft={20} marginBottom={10}>
                    <Text fontSize={20} fontWeight={600} color="gray.600">Basic Information</Text>
                </Flex>
                
                <Flex paddingLeft={20} flexDirection="column">

                    <label htmlFor='fullname'><Text fontSize={16} fontWeight={400} marginBottom={2}>Full Name</Text></label>
                    < Spacer />
                    <Input
                        id='fullname'
                        name='fullname'
                        type='fullname'
                        onChange={formik.handleChange}
                        value={formik.values.fullname}
                        placeholder='Enter your name and last name'
                        width={687}
                        bg="#FFFFFF"
                        borderColor="gray.400"
                    />
                      
                <Flex marginTop={10} flexDirection="row">

                    <Flex flexDirection="column" marginRight={19}>
                    <label htmlFor='username'><Text fontSize={16} fontWeight={400} marginBottom={2} marginRight={3}>Username</Text></label>   
                    <Input
                        id='username'
                        name='username'
                        type='username'
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        placeholder='Enter your username'
                        width={320}
                        bg="#FFFFFF"
                        borderColor="gray.400"
                    />
                    <label htmlFor='password'><Text fontSize={16} fontWeight={400} marginBottom={2} marginRight={3} marginTop={10}>Password</Text></label>   
                    <Input
                        id='password'
                        name='password'
                        type='password'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        placeholder='Enter your password'
                        width={320}
                        bg="#FFFFFF"
                        borderColor="gray.400"
                    />
                    <label htmlFor='birth_date'><Text fontSize={16} fontWeight={400} marginBottom={2} marginRight={3} marginTop={10}>Date of Birth</Text></label>   
                    <Input
                        id='birth_date'
                        name='birth_date'
                        type='date'
                        onChange={formik.handleChange}
                        value={formik.values.birth_date}
                        placeholder='Select your date of birth'
                        width={320}
                        bg="#FFFFFF"
                        borderColor="gray.400"
                        color={formik.values.birth_date ? "gray.800" : "gray.500"}
                    />
                </Flex>    

                <Flex flexDirection="column" marginLeft={7}>
                    <label htmlFor='email'><Text fontSize={16} fontWeight={400} marginBottom={2} marginRight={3}>Email</Text></label>
                    <Input
                        id='email'
                        name='email'
                        type='email'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        placeholder='Enter your email'
                        width={320}
                        bg="#FFFFFF"
                        borderColor="gray.400"
                    />
                    <label htmlFor='id_number'><Text fontSize={16} fontWeight={400} marginBottom={2} marginRight={3} marginTop={10}>ID Number</Text></label>   
                    <Input
                        id='id_number'
                        name='id_number'
                        type='id_number'
                        onChange={formik.handleChange}
                        value={formik.values.id_number}
                        placeholder='Enter your ID Number'
                        width={320}
                        bg="#FFFFFF"
                        borderColor="gray.400"
                    />
                    <label htmlFor='country'><Text fontSize={16} fontWeight={400} marginBottom={2} marginRight={3} marginTop={10}>Country</Text></label>
                     
                    <Select
                        id='country'
                        name='country'
                        onChange={formik.handleChange}
                        value={formik.values.country}
                        placeholder='Select your country'
                        width={320}
                        bg="#FFFFFF" 
                        borderColor="gray.400"
                        _focus={{borderColor: "orange.400", outlineStyle: "none", color: "gray.800", boxShadow: "none"}}
                        colorScheme="gray.800"
                        color={formik.values.country ? "gray.800" : "gray.500"}
                        >
                        <OptionCountry />
                    </Select>
          
                </Flex>

                </Flex>

            {/* Upload file image */}

            <Flex marginTop={20} flexDirection="column">
                <Text fontSize={20} fontWeight={600} color="gray.600" marginBottom={10}>Profile Picture</Text>
                <Flex width={167} height={167} bg="#F1F2F6" flexDirection="column" justifyContent="center" alignItems="center" >
                    <label htmlFor="file-upload" className="custom-file-upload">
                    <Text color="orange.500" fontSize={30} textAlign="center">+</Text>
                    <Text color="orange.500" fontSize={14} fontStyle="medium">Upload photo</Text>
                    </label>
                    <input id="file-upload" name="image" type="file" style={{ display: "none" }} onChange={(event) => {
                    formik.setFieldValue("image", event.currentTarget.files[0]);
                    }} />
                </Flex>
            </Flex>

                <Text fontSize={20} fontWeight={600} color="gray.600" marginTop={20}>Credit Card</Text>

                <Flex marginTop={10} flexDirection="row" marginBottom={10} >
                    <Flex flexDirection="column"> 
                        <label htmlFor='card_number'><Text fontSize={16} fontWeight={400} marginBottom={2} marginRight={3}>Card Number</Text></label>
                        <Input
                            id='card_number'
                            name='card_number'
                            type='card_number'
                            onChange={formik.handleChange}
                            value={formik.values.card_number}
                            placeholder='Enter your card number'
                            width={320}
                            bg="#FFFFFF"
                            borderColor="gray.400"
                        />
                        <label htmlFor='expire_date'><Text fontSize={16} fontWeight={400} marginBottom={2} marginRight={3} marginTop={10}>Expiry Date</Text></label>   
                        <Input
                            id='expire_date'
                            name='expire_date'
                            type='expire_date'
                            onChange={formik.handleChange}
                            value={formik.values.expire_date}
                            placeholder='MM/YY'
                            width={320}
                            bg="#FFFFFF"
                            borderColor="gray.400"
                        />
                    </Flex>
                    <Flex flexDirection="column" marginLeft={12}> 
                        <label htmlFor='card_owner'><Text fontSize={16} fontWeight={400} marginBottom={2} marginRight={3}>Card Owner</Text></label>
                        <Input
                            id='card_owner'
                            name='card_owner'
                            type='card_owner'
                            onChange={formik.handleChange}
                            value={formik.values.card_owner}
                            placeholder='Enter your card name'
                            width={320}
                            bg="#FFFFFF"
                            borderColor="gray.400"
                        />
                        <label htmlFor='cvc_cvv'><Text fontSize={16} fontWeight={400} marginBottom={2} marginRight={3} marginTop={10}>CVC/CVV</Text></label>   
                        <Input
                            id='cvc_cvv'
                            name='cvc_cvv'
                            type='cvc_cvv'
                            onChange={formik.handleChange}
                            value={formik.values.cvc_cvv}
                            placeholder='CVC/CVV'
                            width={320}
                            bg="#FFFFFF"
                            borderColor="gray.400"
                        />
                    </Flex>
                    
                </Flex>

            </Flex>

            <Flex marginLeft={20} marginTop={19} flexDirection="column">
                <Button type='submit' variant="primary" width={320}>Register</Button>
                <Flex flexDirection="row" marginTop={10} gap={3}>
                    <Text color="gray.700">Already have an account?</Text>
                    <Text color="orange.500" fontWeight={600}><Link to="/login">Login</Link></Text>
                </Flex>
            </Flex>

            </Flex>
        
        </Flex> 

        
    </form>
        
    )


}

export default RegisterPage
