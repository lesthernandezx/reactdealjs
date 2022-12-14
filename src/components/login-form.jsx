import {useState} from 'react'
import React, { useRef } from 'react'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'

import {signInWithEmailAndPassword} from '@firebase/auth'
import {auth} from '../firebase'
import {useAuthValue} from '../AuthContext'

export default function LoginForm (){

  const emailField = useRef()

  const passwordField = useRef()

  const {setTimeActive} = useAuthValue()
  const [error, setError] = useState('')

  const handleLogin = async () => {
    const email = emailField.current.value
    const password = passwordField.current.value
    console.log('email', email)
    console.log('password', password)

    signInWithEmailAndPassword(auth, email, password)
    .then((response) => {
      console.log ('response', response);
    })
    .catch(err => setError(err.message))
    }

  return <div>
    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" onSubmit={ (e) => { e.preventDefault() }} noValidate sx={{ mt: 1 }} >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  inputRef={emailField}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  inputRef={passwordField}

                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleLogin}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {'Don\'t have an account? Sign Up'}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
  </div>
}