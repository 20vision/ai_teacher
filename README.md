# AI Teacher - https://www.20.vision/20vision_ai_teacher?referrer=github

## 1/8 | Introduction to AI Teacher

AI Teacher is an artificial intelligence system that generates educational content based on subject popularity. It overcomes the limitations of chat GPT by anticipating the user's needs rather than requiring explicit questions. This tutorial will guide you through creating your own AI Teacher, which can be a powerful resource for various projects. You'll need access to a social media platform that allows retrieving popular posts and access to chat GPT. Find the complete code for this tutorial on Github.

## 2/8 | Creating the Initial Post and Topic

First, create and publish a post to serve as input for the AI. This post will initiate the content generation loop. Here's an example post about politics: "An Overview of Politics - Politics encompasses the activities, actions, and policies that govern a society, involving the distribution of power and resources. It is a multifaceted subject that spans various aspects, such as political ideologies, systems, institutions, and parties. Political processes are shaped by historical, cultural, ..."

## 3/8 | Chat GPT - Prompt Engineering

Design a prompt for the AI to generate posts. An example prompt is: "Pretend to be an author. Write a book about x. Each chapter can be 430 characters long. Return your response without an introduction, conclusion." Experiment with different wordings and phrasings to optimize results.

## 4/8 | Formatting Content and Adding Image Generation Prompts

Use chat GPT to format its responses for use in your code. Provide instructions to generate a JSON object with a detailed image prompt for each chapter. The JSON object should follow this structure: [{header: ..., paragraph: ..., image_prompt: ...}, {header: ..., ...'"

## 5/8 | API Keys and JavaScript Initial Setup for the AI Teacher

Implement the AI Teacher class generation in JavaScript using OpenAI and 20Vision APIs. Include necessary configurations and your API keys. Use npm packages "axios" and "openai". Generate your 20Vision API https://20.vision?referrer=github Key from your profile and the OpenAI key at https://openai.com/blog/openai-api. Replace YOUR_20VISION_PAGENAME with your unique pagename.

## 6/8 | Retrieving Popular Posts with 20Vision API

### Set request headers with your 20Vision API key: x-api-key: YOUR_20VISION_API_KEY. Use this URI to retrieve 10 popular posts for a specific page: https://api.20.vision/external/components/${YOUR_20VISION_PAGENAME}/${offset}

## 7/8 | Implementing OpenAI API for AI Teacher Tutorial

Integrate chat GPT into your JavaScript code using the openai package's openai.createChatCompletion function. This function accepts parameters like model, an array of messages (with role and content), temperature, and top_p to configure AI behavior.

## 8/8 | Generating Images with Dall-E and Posting Content to 20Vision API

To generate images, use openai.createImage and pass in a prompt. Download the image URL provided by OpenAI, convert it to base64, and upload it to 20Vision. Construct a body object with header, body, parent_uids (optional), and image_base64. Send the object to https://api.20.vision/external/component/${YOUR_PAGENAME}.
