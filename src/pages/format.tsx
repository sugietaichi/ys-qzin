import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { ChangeEvent, useEffect, useState } from 'react'
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { db } from '@utilities/firebase'
import { doc, DocumentData, DocumentSnapshot, getDoc } from 'firebase/firestore'
import { useAuthContext } from '@components/AuthContext'
import { FormatData } from '@utilities/types'
import { useRecoilState, useRecoilValue } from 'recoil'
import { formatState } from 'src/atoms/formatAtom'
import BasicInfo from '@components/BasicInfo'
import ProvisionInfo from '@components/ProvisionInfo'

export default function () {
  const { user } = useAuthContext()
  const [format, setFormat] = useRecoilState(formatState)
  const [formData, setFormData] = useState<FormatData>()

  const fetchAlreadyStoredFormatData = async () => {
    if (user) {
      getDoc(doc(db, `users/${user.uid}/format/kosatsu`))
        .then((doc: DocumentSnapshot<DocumentData>) => {
          doc.exists() && setFormData(doc.data() as FormatData)
          return
        })
        .catch((e: any) => {
          console.log(e)
        })
    }
  }

  //ユーザーデータ取得
  useEffect(() => {
    fetchAlreadyStoredFormatData()
  }, [user])

  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }
  const handleReset = () => {
    setActiveStep(0)
  }

  const steps = [
    {
      label: '基本情報',
      discription: 'お名前・生年月日等をご入力ください。',
      content: <BasicInfo />,
    },
    {
      label: 'ご経験・撮影条件',
      content: <ProvisionInfo />,
    },
    {
      label: '写真・動画',
      content: ``,
    },
  ]

  return (
    <>
      <button onClick={() => console.log(format)}>test</button>
      <Typography component='h1' variant='h4' align='center'>
        個撮フォーマット
      </Typography>
      <Box sx={{ maxWidth: 400 }}>
        <Stepper activeStep={activeStep} orientation='vertical'>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 2 ? (
                    <Typography variant='caption'>Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography variant='caption'>{step.discription}</Typography>
                {step.content}
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant='contained'
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? 'Finish' : '次へ'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      戻る
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )}
      </Box>
    </>
  )
}
