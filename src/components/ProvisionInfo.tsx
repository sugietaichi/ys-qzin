import {
  Grid,
  TextField,
  FormHelperText,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { useRecoilState } from 'recoil'
import { formatState } from 'src/atoms/formatAtom'

const ProvisionInfo = () => {
  const [format, setFormat] = useRecoilState(formatState)

  const {
    lastname,
    lastnameYomigana,
    firstname,
    firstnameYomigana,
    birthdate,
    hasIdentityIdCard,
    hasIdentityIdCardType,
    residencePrefectures,
    nearStation,
  } = format

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sx={{ marginTop: 2 }}>
        <TextField
          id='lastname'
          required
          label='スリーサイズ'
          fullWidth
          variant='standard'
          value={lastname}
          onChange={(e: any) => {
            setFormat({ ...format, lastname: e.target.value })
          }}
        />
        <FormHelperText>お名前を入力してください</FormHelperText>
      </Grid>
      <Grid item xs={6} sx={{ marginTop: 2 }}>
        <TextField
          id='firstname'
          required
          label='名'
          fullWidth
          variant='standard'
          defaultValue={firstname}
          onChange={(e: any) => {
            setFormat({ ...format, firstname: e.target.value })
          }}
        />
        {/* <FormHelperText>名前を入力してください</FormHelperText> */}
      </Grid>
      <Grid item xs={6} sx={{ marginTop: 2 }}>
        <TextField
          id='lastnameYomigana'
          required
          label='セイ'
          fullWidth
          variant='standard'
          value={lastnameYomigana}
          onChange={(e: any) => {
            setFormat({ ...format, lastnameYomigana: e.target.value })
          }}
        />
        <FormHelperText>よみがなを入力してください</FormHelperText>
      </Grid>
      <Grid item xs={6} sx={{ marginTop: 2 }}>
        <TextField
          id='firstnameYomigana'
          required
          label='メイ'
          fullWidth
          variant='standard'
          value={firstnameYomigana}
          onChange={(e: any) => {
            setFormat({ ...format, firstnameYomigana: e.target.value })
          }}
        />
        {/* <FormHelperText>名前のよみがなを入力してください</FormHelperText> */}
      </Grid>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid item xs={12} sx={{ marginTop: 2 }}>
          <DatePicker
            label='生年月日'
            value={birthdate || dayjs()}
            onChange={(newValue) => {
              setFormat({ ...format, birthdate: newValue })
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                // helperText={params?.inputProps?.placeholder}
                helperText={`宿題: yyyy/mm/dd形式に変更&年齢計算`}
              />
            )}
          />
        </Grid>
      </LocalizationProvider>

      <Grid item xs={12} sx={{ marginTop: 2 }}>
        <FormControl>
          <FormLabel id='hasIdentityIdCard'>顔写真付き身分証明書</FormLabel>
          <RadioGroup
            row
            aria-labelledby='hasIdentityIdCard'
            name='hasIdentityIdCard'
            defaultValue={hasIdentityIdCard}
            onChange={(e: any) => {
              setFormat({ ...format, hasIdentityIdCard: e.target.value })
            }}
          >
            <FormControlLabel value='有' control={<Radio />} label='有' />
            <FormControlLabel value='無' control={<Radio />} label='無' />
          </RadioGroup>
        </FormControl>
      </Grid>
      {hasIdentityIdCard === '有' && (
        <Grid item xs={9} sx={{ marginTop: 2 }}>
          <FormControl fullWidth>
            <InputLabel id='hasIdentityIdCardType'>身分証の種類</InputLabel>
            <Select
              labelId='select-identity-card-type'
              id='hasIdentityIdCardType'
              value={hasIdentityIdCardType}
              label='身分証の種類'
              onChange={(e: any) => {
                setFormat({
                  ...format,
                  hasIdentityIdCardType: e.target.value,
                })
              }}
            >
              <MenuItem value={'運転免許証'}>運転免許証</MenuItem>
              <MenuItem value={'マイナンバーカード'}>
                マイナンバーカード
              </MenuItem>
              <MenuItem value={'パスポート'}>パスポート</MenuItem>
              <MenuItem value={'その他'}>その他</MenuItem>
              <MenuItem value={'わからない'}>わからない</MenuItem>
              <MenuItem value={'あとで相談する'}>あとで相談する</MenuItem>
            </Select>
            <FormHelperText>身分証の種類をお選びください</FormHelperText>
          </FormControl>
        </Grid>
      )}

      <Grid item xs={9} sx={{ marginTop: 2 }}>
        <FormControl fullWidth>
          <InputLabel id='residencePrefectures'>お住まい(都道府県)</InputLabel>
          <Select
            labelId='residencePrefectures'
            id='residencePrefectures'
            value={residencePrefectures}
            label='お住まい(都道府県)'
            onChange={(e: any) => {
              setFormat({ ...format, residencePrefectures: e.target.value })
            }}
          >
            {[
              '北海道',
              '青森県',
              '岩手県',
              '宮城県',
              '秋田県',
              '山形県',
              '福島県',
              '茨城県',
              '栃木県',
              '群馬県',
              '埼玉県',
              '千葉県',
              '東京都',
              '神奈川県',
              '新潟県',
              '富山県',
              '石川県',
              '福井県',
              '山梨県',
              '長野県',
              '岐阜県',
              '静岡県',
              '愛知県',
              '三重県',
              '滋賀県',
              '京都府',
              '大阪府',
              '兵庫県',
              '奈良県',
              '和歌山県',
              '鳥取県',
              '島根県',
              '岡山県',
              '広島県',
              '山口県',
              '徳島県',
              '香川県',
              '愛媛県',
              '高知県',
              '福岡県',
              '佐賀県',
              '長崎県',
              '熊本県',
              '大分県',
              '宮崎県',
              '鹿児島県',
              '沖縄県',
            ].map((option, index) => (
              <MenuItem value={option} key={index}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={9} sx={{ marginTop: 2, marginBottom: 8 }}>
        <TextField
          id='nearStation'
          required
          label='最寄り駅'
          fullWidth
          variant='standard'
          value={nearStation}
          onChange={(e: any) => {
            setFormat({ ...format, nearStation: e.target.value })
          }}
          InputProps={{
            endAdornment: <InputAdornment position='end'>駅</InputAdornment>,
          }}
        />
      </Grid>
    </Grid>
  )
}

export default ProvisionInfo
