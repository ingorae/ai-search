const Anthropic = require('@anthropic-ai/sdk');
const express = require('express')
const cors = require('cors')

const anthropic = new Anthropic({
  apiKey: process.env['ANTHROPIC_API_KEY'],
});
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', function(req, res) {
  res.send('Hello World')
})

app.post('/search', async function(req, res) {
  console.log(req.body.ask);
  if (req.body.ask == '')
    return;

  const message = await anthropic.messages.create({
    max_tokens: 1024,
    messages: [{ role: 'user', content: req.body.ask }],
    // messages: [{ role: 'user', content: '안녕, Claude. 난 준실이야. 이제부터 한글로 대답하고, 내가 웹사이트 검색하는데 도움을 줘.' }],
    model: 'claude-3-opus-20240229',
  });

  let search_result = message.content;
  console.log(message);
  res.json({"assistant": search_result})
})

app.listen(3000)
