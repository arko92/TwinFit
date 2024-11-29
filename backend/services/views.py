from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load API_KEY and configure genai
load_dotenv()
genai.configure(api_key=os.getenv('API_KEY'))

class GetHealthAdviceView(APIView):

    """
    API endpoint to generate health advice based on user input.
    """

    def post(self, request, format=None):     
        required_fields = ['age', 'height', 'weight', 'sleep_hours', 'calories_intake', 'exercise_duration', 'water_intake']

        # Validate required fields
        for field in required_fields:
            if field not in request.data:
                return Response({'error': f'Missing required field: {field}'}, status=400)
            
        # Extract user input from the request
        age = request.data.get('age')
        height = request.data.get('height')
        weight = request.data.get('weight')
        sleep_hours = request.data.get('sleep_hours')
        calories_intake = request.data.get('calories_intake')
        exercise_duration = request.data.get('exercise_duration')
        water_intake = request.data.get('water_intake')

        # Construct the prompt for the AI model
        prompt = f"""
            Based on the following user information:
            - Age: {age}
            - Weight: {weight} kg
            - Height: {height} cm
            - Sleep Hours: {sleep_hours}
            - Daily Calorie Intake: {calories_intake}
            - Exercise Duration: {exercise_duration} minutes
            - Water Intake: {water_intake} liters

            Provide specific, actionable health advice focused on improving overall well-being. 
            - Address sleep, exercise, diet, and hydration.
            - Mention only realistic and measurable suggestions (e.g., reduce calorie intake by 500, increase exercise by 20 minutes).
            - Highlight one negative health impact of not following the suggestion.
            - Limit the response to 2 lines maximum and avoid contradicting information.

            ### Examples of Responses:
            1. Input: Age: 25, Weight: 70 kg, Height: 175 cm, Sleep Hours: 6, Daily Calorie Intake: 2500, Exercise Duration: 10 minutes, Water Intake: 1.5 liters
            Advice: Sleep 7–8 hours and drink 2 liters of water daily to boost energy and prevent fatigue. Exercise 20 minutes daily to improve fitness.

            2. Input: Age: 40, Weight: 90 kg, Height: 165 cm, Sleep Hours: 5, Daily Calorie Intake: 3000, Exercise Duration: 0 minutes, Water Intake: 1 liter
            Advice: Reduce calorie intake to 2500 and walk 30 minutes daily to lower risk of obesity and hypertension. Drink 2 liters of water.

            3. Input: Age: 30, Weight: 60 kg, Height: 160 cm, Sleep Hours: 8, Daily Calorie Intake: 2000, Exercise Duration: 60 minutes, Water Intake: 2.5 liters
            Advice: Your routine is excellent! Maintain regular exercise and hydration to support your active lifestyle.

            4. Input: Age: 50, Weight: 85 kg, Height: 170 cm, Sleep Hours: 6, Daily Calorie Intake: 1800, Exercise Duration: 15 minutes, Water Intake: 1.2 liters
            Advice: Walk for 30 minutes daily and drink 2 liters of water to prevent dehydration and maintain weight. Sleep 7 hours for better recovery.

            5. Input: Age: 35, Weight: 78 kg, Height: 175 cm, Sleep Hours: 7, Daily Calorie Intake: 2200, Exercise Duration: 20 minutes, Water Intake: 2 liters
            Advice: Increase exercise to 30 minutes daily and maintain hydration at 2.5 liters to improve stamina. Limit calorie intake to 2000.

            ### Now respond to the following input:
            - Age: {age}
            - Weight: {weight} kg
            - Height: {height} cm
            - Sleep Hours: {sleep_hours}
            - Daily Calorie Intake: {calories_intake}
            - Exercise Duration: {exercise_duration} minutes
            - Water Intake: {water_intake} liters
       """
        try:
            # Initialize the generative model
            model = genai.GenerativeModel('gemini-1.5-flash')
            response = model.generate_content(prompt)
            # Clean the response text (remove \n)
            advice = response.text.replace("\n", " ")

            # Return the generated advice
            return Response({"health_advice": advice}, status=200)

        except Exception as e:
            return Response({'error': f'Something went wrong when getting a health advice: {str(e)}'})
