import * as React from 'react'

export default class extends React.Component<any, any>{

  render(){
    return <div className="container">
    <div className="content">
<h1 id="about">About</h1>

<p>An interactive mindmap that you can drag around and customise built using D3, React, Redux and Typescript.</p>

<ul>
<li><a href="https://github.com/horizon0708/ReactForceMindmap">Redux repo</a></li>

<li><a href="https://github.com/horizon0708/force-mindmap">D3 repo</a></li>

<li>Say hi to me via <a href="http://twitter.com/LLHorizon">twitter</a></li>

<li>Check out <a href="https://blog.jameskim.co.nz">my blog</a> (very new) or <a href="https://jameskim.co.nz">my portfoilo</a></li>

<li>

<li>Is anyone looking for a front-end dev? Hit me up ;)</li>
</li>
</ul>

<h2 id="why">Why</h2>

<p>TL;DR I procrastinated instead of doing my job applications.</p>

<p>Around a week ago, I decided that I wanted to update my CV and my portfolio website. I wasn't really sure to how to list my skills in Web dev. While I didn't want to list <em>everything</em> I've used, I also wanted to show that I make an effort to try new tech and learn new things whenever possible.</p>

<p>I didn't want a boring list of skills. But whenever I tried to make it "interesting" visually, I found that it was often too cluttered. I also found it hard to really group things together. For example, should I put Enzyme under 'Testing' or 'React'? So I thought to myself, maybe an interactive mindmap would be cool. I could also brush up on D3.</p>

<p>So I spent the first 3 days making <a href="https://github.com/horizon0708/force-mindmap">Force-Mindmap</a>. At that point it was working okay. Instead of being happy with that, however, I had decided I wanted to share this with other people. And when I thought about sharing, I thought it would be even cooler if I made it so that other people could generate their own mind-maps and share them. So I spent the next 3 days making this website using React, Redux and Typescript.</p>

<p>At the moment, you can share your mindmaps by exporting them and importing them. I really wanted to enable sharing the mindmap by url, but I would need an backend server to do that; and I have ran out of time I have given myself. </p>

<p>I have learnt a lot about d3, redux (esp with typescript) and Gatsby with this project and hopefully I will have time to write some interesting blog posts about it later!</p>
    </div>
    </div>
  }
}