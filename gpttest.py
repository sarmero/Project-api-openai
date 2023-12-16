import os
import openai

openai.api_key = "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"
openai.organization = "org-aRk5qOJeKRWHo7omOJTkeyoZ"

question=input("ingrese una pregunta?")

response = openai.ChatCompletion.create(
  model="gpt-3.5-turbo",
  messages=[
    {
      "role": "user",
      "content": question
    }   
    
  ],
  temperature=1,
  max_tokens=256,
  top_p=1,
  frequency_penalty=0,
  presence_penalty=0
)

print(response["choices"])