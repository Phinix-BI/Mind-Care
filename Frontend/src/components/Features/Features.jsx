import {  CalendarDaysIcon, ChatBubbleLeftRightIcon,ClockIcon ,ClipboardDocumentCheckIcon} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom';

const features = [
  {
    name: 'Mental Health Assessment',
    description:
      'Quickly gain insights into your well-being with our confidential assessment. Answer tailored questions for personalized support and self-discovery.',
    icon: ClipboardDocumentCheckIcon,
    link: 'DiagnosTest',
  },
  {
    name: '1:1 Chat with AI Therapist',
    description:
      'Connect confidentially 24/7 with our AI therapy chat. Receive immediate support, coping strategies, and a virtual listening ear.',
    icon: ChatBubbleLeftRightIcon,
    link: 'chat',
  },
  {
    name: 'Appointments Booking',
    description:
      'Take control of your well-being. Easily schedule virtual sessions with licensed professionals for a hassle-free and confidential experience.',
    icon: CalendarDaysIcon,
    link: 'FindDoctors',
  },
  {
    name: '24/7 AI Therapist ',
    description:
      'Access support anytime with our round-the-clock AI therapist. Prioritize your mental health with immediate guidance and companionship.',
    icon: ClockIcon,

  },
]

export default function Example() {
  return (
    <section id="features">
    <div className="bg-white py-24 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Our Features</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Unlocking Wellbeing Excellence
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
          Instantly access personalized insights and support. Seamlessly integrate features like mental health assessment, AI therapist chat and more.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <Link to={feature.link} key={feature.name}>
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon className="h-6 w-6 text-white"  aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
              </Link>
            ))}
          </dl>
        </div>
      </div>
    </div>
    </section>
  )
}
