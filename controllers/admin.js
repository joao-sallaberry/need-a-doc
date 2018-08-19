
module.exports = {
  config: {
    get: (req, res) => {
      res.render('admin/config', {
        timeSlots: [
          { weekday: 'seg', startTime: '09:00', endTime: '17:00' },
          { weekday: 'qua', startTime: '09:00', endTime: '17:30' },
          { weekday: 'sex', startTime: '10:00', endTime: '18:00' }
        ],
        weekdays: ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'],
        times: getPossibleTimes()
      })
    },
    post: (req, res) => {
      console.log('post config', req.body)
    }
  }
}

function getPossibleTimes () {
  const asNumbers = []
  for (let x = 0; x < 2400; x += 100) {
    asNumbers.push(x)
    asNumbers.push(x + 30)
  }
  return asNumbers.map(timeNumberToString)
}

function timeNumberToString (num) {
  const hour = Math.floor(num / 100).toString().padStart(2, '0')
  const minute = (num % 100).toString().padStart(2, '0')
  return `${hour}:${minute}`
}
