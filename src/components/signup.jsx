import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "./ui/input"
import { BeatLoader } from "react-spinners"
import { Button } from "./ui/button"
import Error from "./error"
import { useEffect, useState } from "react"
import * as Yup from "yup"
import useFetch from "@/hooks/use-fetch"
import { signup } from "@/db/apiAuth"
import { useNavigate, useSearchParams } from "react-router-dom"
import { UrlState } from "@/context"
const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  })

  const navigate = useNavigate()
  let [searchParams] = useSearchParams()
  const longLink = searchParams.get("createNew")

  const [errors, setErrors] = useState([])

  const handleInputChange = (e) => {
    const { name, value, files } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }))
  }

  const { data, error, loading, fn: fnSignup } = useFetch(signup, formData)
  const { fetchUser } = UrlState()
  useEffect(() => {
    if (error == null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`)
      fetchUser()
    }
  }, [error, loading])
  //for validate
  const handleSignup = async () => {
    setErrors([])
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("name is required"),
        email: Yup.string()
          .email("invalid email")
          .required("email is required"),
        password: Yup.string()
          .min(6, "password must be 6 characters")
          .required("password is required"),
        profile_pic: Yup.mixed().required("profile pic is required"),
      })
      await schema.validate(formData, { abortEarly: false })

      //api call
      await fnSignup()
    } catch (e) {
      const newErrors = {}
      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message
      })
      setErrors(newErrors)
    }
  }
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Signup </CardTitle>
          <CardDescription>
            create a new account if you haven&rsquo;t already
          </CardDescription>
          {error && <Error message={error.message} />}
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Input
              name="name"
              type="text"
              placeholder="Enter name"
              onChange={handleInputChange}
            />
            {errors.name && <Error message={errors.name} />}
          </div>
          <div className="space-y-1">
            <Input
              name="email"
              type="email"
              placeholder="Enter email"
              onChange={handleInputChange}
            />
            {errors.email && <Error message={errors.email} />}
          </div>
          <div className="space-y-1">
            <Input
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleInputChange}
            />
            {errors.password && <Error message={errors.password} />}
          </div>
          <div className="space-y-1">
            <Input
              name="profile_pic"
              type="file"
              accept="image/*"
              onChange={handleInputChange}
            />
            {errors.profile_pic && <Error message={errors.profile_pic} />}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSignup}>
            {loading ? (
              <BeatLoader size={10} color="#36d7b7" />
            ) : (
              "Create Account"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Signup